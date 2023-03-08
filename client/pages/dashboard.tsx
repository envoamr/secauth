import to from "await-to-js";
import axios from "../composables/axiosConfig";

const dashboard = () => {
  const k = async () => {
    const m = await axios.get("/dashboard");
    console.log(m.data);
    console.log(m.request);
  };
  k();
  return <div>dashboard</div>;
};

/*
export async function getStaticProps(context: any) {
  // Fetch data from external API
  // const [err, res] = await to(axios.get("http://localhost:5000/api/dashboard"));
  const [err, res] = await to(axios.get("http://localhost:5000/"));
  console.log(res, "ress");
  console.log(err, "errr");

  // Pass data to the page via props
  return { props: { res: 2, msg: "hi" } };
}
*/
export default dashboard;
