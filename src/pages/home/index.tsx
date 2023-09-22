import { useEffect } from "react";
import { api } from "../../services/api";

function Home() {
  const token = localStorage.getItem("auth.token");

  useEffect(() => {
    api.get("/user").then(response => console.log(response))
  }, [])
    return (
      <h1>Hello {token}</h1>
    );
};
  
export default Home;