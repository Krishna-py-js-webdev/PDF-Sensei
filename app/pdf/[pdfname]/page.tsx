import { useParams } from "next/navigation";
import PdfConversation from "@/components/PdfConversation";

const PdfPage = () => {
  const params = useParams(); 
  const pdfName = params.pdfName; // Get the PDF name from the URL

  if (!pdfName) return <p>Loading...</p>;

  return <PdfConversation />;
};

export default PdfPage;
