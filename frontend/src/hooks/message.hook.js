import { useCallback } from "react";

export const useMessage = () => {
  return useCallBack((msg) => {
    console.log(msg);
  }, []);
};
