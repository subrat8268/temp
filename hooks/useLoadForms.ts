import { useState, useEffect } from "react";
import { fetchAllForms } from "@/api/apiUtils";

interface Form {
  id: string;
  customerName: string;
  subProject: { name: string };
  createdAt: string;
}

const useForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadForms = async () => {
    try {
      setLoading(true);
      const data = await fetchAllForms();
      const formsData: Form[] = Array.isArray(data.forms) ? data.forms : [];

      const sortedForms = formsData.sort((a: Form, b: Form) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      setForms(sortedForms);
    } catch (error) {
      console.error("Failed to load forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const reRenderFunction = () => {
    loadForms();
  };

  useEffect(() => {
    loadForms();
  }, []);

  return { forms, loading, reRenderFunction };
};

export default useForms;
