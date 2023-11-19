import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import data from "./data.json";

export interface CustomStateContextProps {
  posts: any[];
}

const CustomStateContext = createContext<CustomStateContextProps>({
  posts: [],
});

export const CustomStateProvider = (props: PropsWithChildren) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if ((data as []).length === 0) return;
    (async () => {
      const promises = ((data as []) || []).map(async (post: any) => {
        const f = `https://${post.path}.ipfs.w3s.link/${post.file}`;
        const res = await fetch(f);
        const data = await res.json();
        return data;
      });
      const _posts = await Promise.all(promises);
      setPosts(_posts);
    })();
  }, []);

  return (
    <CustomStateContext.Provider
      value={{
        posts,
      }}
    >
      {props.children}
    </CustomStateContext.Provider>
  );
};

export const useAppState = () => useContext(CustomStateContext);
