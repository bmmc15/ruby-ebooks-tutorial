import { useNavigate } from "react-router-dom";

export const useGetNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (url: string) => () => {
    navigate(url);
  };

  return {
    navigateTo,
  };
};
