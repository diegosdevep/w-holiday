import * as Yup from 'yup';

export function initialValues() {
  return {
    title: '',
    description: '',
    category: '',
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required('Titulo Obligatorio'),
    description: Yup.string().required('Descripcion Obligatoria'),
    category: Yup.string().required('Selecciona una categoría'),
    images: Yup.array()
      .min(1, 'Se requiere una imagen como minimo')
      .required('La imagen es requerida'),
  });
}
