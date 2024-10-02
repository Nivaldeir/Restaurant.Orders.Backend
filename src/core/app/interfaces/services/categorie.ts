export interface ICategorieService {
  create(data: InputCreateCategorieDTO): Promise<OutputCreateCategorieDTO>;
  findAll(): Promise<OutputCreateCategorieDTO[]>;
  delete(data: InputDeleteCategorieDTO): Promise<void>;
}

export type InputCreateCategorieDTO = {
  name: string;
};

export type OutputCreateCategorieDTO = {
  id: string;
  name: string;
};

export type InputDeleteCategorieDTO = {
  id: string;
};
