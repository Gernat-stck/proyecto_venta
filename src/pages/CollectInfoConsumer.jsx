import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InvoiceTemplate from "../components/InvoiceTemplate";
import InvoiceViewer from "../components/InvoiceViewer";
import UpdateData from "../components/UpdateData";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import InfoClientComp from "../components/InfoClientComp";
import "react-toastify/dist/ReactToastify.css";

const CollectInfoConsumer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { cart } = state || {};
  const { totalAmount } = state || {};
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    municipio: "",
    departamento: "",
    registro_num: "",
    giro: "",
    documento: "",
    email: "",
  });
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceBlob, setInvoiceBlob] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const { fetchData, error } = useAxios({});
  useAuth();

  const handleBlobGenerated = (blob) => {
    setInvoiceBlob(blob);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClientData = {
      nombre_cliente: `${formData.nombre} ${formData.apellido}`,
      direccion: `${formData.direccion}, ${formData.municipio}, ${formData.departamento}`,
      numero_telefono: formData.telefono,
      email: formData.email,
      giro: formData.giro,
      documento: formData.documento,
      registro_num: formData.registro_num,
      cart: cart,
      subtotal: totalAmount,
      iva: totalAmount * 0.13,
      total: totalAmount,
    };
    setInvoiceData(updatedClientData);
    setShowForm(false); // Muestra InvoiceTemplate
  };

  const handleSendInvoice = async () => {
    if (!invoiceBlob) {
      toast.error("Error al generar el PDF. Por favor, inténtelo de nuevo.");
      return;
    }

    const formDataToSend = new FormData();

    for (const key in invoiceData) {
      formDataToSend.append(key, invoiceData[key]);
    }

    formDataToSend.append("factura", invoiceBlob, "factura.pdf");

    try {
      const response = await fetchData({
        url: "/invoices",
        method: "post",
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      if (response) {
        setIsConfirmed(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear la factura. Por favor, inténtelo de nuevo.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    handleSendInvoice(); // Llama a la función para enviar el PDF y datos
  };

  const handleCancel = () => {
    navigate("/maindashboard/facturacion");
  };

  return (
    <div className="flex items-normal justify-center w-full h-full">
      <ToastContainer />
      {showForm ? (
        <div className="h-[50%]">
          <InfoClientComp
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
      ) : invoiceBlob ? (
        <div className="w-[50%]">
          <InvoiceViewer blob={invoiceBlob} />
          <div className="flex justify-center mt-2">
            {!isConfirmed ? (
              <div className="flex justify-center">
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-5"
                >
                  Confirmar Datos
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForm(true);
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <UpdateData
                  cart={cart}
                  createRecord={invoiceData}
                  invoiceBlob={invoiceBlob}
                />
                <a
                  href={URL.createObjectURL(invoiceBlob)}
                  download={`${formData.nombre}_${formData.apellido}.pdf`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-5"
                >
                  Descargar PDF
                </a>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Nueva compra!
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        invoiceData && (
          <InvoiceTemplate
            data={invoiceData}
            onBlobGenerated={handleBlobGenerated}
          />
        )
      )}
    </div>
  );
};

export default CollectInfoConsumer;
