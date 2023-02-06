import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useDocFetchIpfs } from "../../lib/hooks/useDocFetchIpfs";

export default function VerifyQr() {
  // const {docs, fetchFiles } = useDocFetchIpfs();
  // const handleFetch = () => {
  //   // fetchFiles(result) docs
  //   fetch(result).then(res => res.json()).then(data => console.log(data))
  // };

  const [posts, setPosts] = useState<any[]>([])

 
  const fetchData = async () => {
    const {data} = await axios.get(result)

    setPosts(data)
  }


  



  const [result, setResult] = useState("No result");

  let handleScan = (data: React.SetStateAction<any>) => {
    if (data) {
      setResult(data);
    }
  };

  let handleError = (err: any) => {
    alert(err);
  };

  return (
    <div>
      <div className="border border-solid w-80">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          facingMode="environment"
        />
        <p>{result}</p>

      
  

      </div>
      <div>
      {posts.map(post => (
            <div key ={post.id}>
              <h5 className="text-center font-bold" >{post.title}</h5>
              <p className="text-center">{post.body}</p>
              <br />
            </div>

          ))}
        
      </div>
      
      <button onClick={fetchData}>Handle Fetch</button>
    </div>
  );
}
