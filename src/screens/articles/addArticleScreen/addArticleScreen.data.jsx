import * as Yup from 'yup';

export function initialValues() {
  return {
    title: '',
    description: '',
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required('Titulo Obligatorio'),
    description: Yup.string().required('Descripcion Obligatoria'),
    images: Yup.array()
      .min(1, 'Se requiere una imagen como minimo')
      .required('La imagen es requerida'),
  });
}
