import React, { useState, useCallback, useEffect } from "react";

function UseCallabackExample({ link }) {
  const [url, setUrl] = useState(link);
  const [data, setData] = useState();

  const fetchData = useCallback(() => {
    fetch(url).then(async (res) => setData(await res.text()));
  }, [url]);

  useEffect(fetchData,[fetchData]);

  return <pre>{data}</pre>;
}

export default UseCallabackExample;
