import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
    callback: () => void
  ): React.RefObject<T> => {
    const ref = useRef<T>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [callback]);
  
    return ref;
  };


export const useRouter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    const query = useMemo(() => {
      const params: any = {};
      searchParams?.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    }, [searchParams]);
  
    const updateQuery = (params: object) => {
      setSearchParams({ ...query, ...params });
    };
  
    const removeQuery = (key: string) => {
      const { [key]: omitted, ...res } = query;
  
      return res;
    };
  
    const get = (key: string) => {
      return query[key];
    };
  
    return {
      query,
      get,
      removeQuery,
      updateQuery,
    };
  };