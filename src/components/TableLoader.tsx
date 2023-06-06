import { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";
// import EventEmitter from "./EventEmitter";

const TableLoader = ({ isLoading }: any) => {

  // isLoading = EventEmitter.on
  // const [show, setShow] = useState<boolean>(false);
  // useEffect(() => {
  //   EventEmitter.on('loading', (data) => setShow(data.loading));
  //   return () => {
  //     EventEmitter.off('loading');
  //   }
  // }, [show])

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: "99.8%",
    borderRadius: "50px"
  };


  return (
    <div>
      <BarLoader
        cssOverride={override}
        color={"#bf8412"}
        loading={isLoading}
      />
    </div>
  );
};

export default TableLoader;
