import { Sources } from "../interfaces/news";

export const capitaLize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setDocumentTitle = (title: string) => {
  document.title = `${capitaLize(title)} - News`;
};

export const transformSourcesToDropDownItems = (items: Sources[] | null) => {
  if (!items) return [];
  return items.map((item) => ({ label: item.name, value: item.id }));
};
