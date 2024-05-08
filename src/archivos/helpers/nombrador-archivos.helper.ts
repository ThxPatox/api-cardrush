import { v4 as uuid } from 'uuid';
export const NombradorDeArchivos = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  const extension = file.mimetype.split('/')[1];
  const randomName = uuid();
  callback(null, `${randomName}.${extension}`);
};
