import { useState } from "react";
import Navbar from "./assets/components/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
