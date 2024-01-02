import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
        .then((res) => {
          setHello(res.data);
        })
  }, []);
  return (
      <div className="App">
        백엔드 데이터 : {hello}
      </div>
  );
}

export default App;