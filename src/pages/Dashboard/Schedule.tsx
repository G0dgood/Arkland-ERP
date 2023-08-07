import moment from "moment";
import ViewScheduleModal from "../../components/Modals/ViewScheduleModal";
import { SVGLoader } from "../../components/SVGLoader";

const Schedule = ({ tasks, isLoading }: any) => {


 return (
  <div className="main-div-col-2">
   <div className="main-todo-1">
    <div className="main-todo-title">
     <h6>{"UPCOMING ToDos"}</h6>
     <span>Today, {moment(Date.now()).format("DD-MMMM-YYYY")}</span>
    </div>
    {isLoading ? (
     <div className="table-loader-announcement1">
      <SVGLoader width={"40px"} height={"40px"} />
     </div>
    ) : tasks?.length === 0 || tasks === undefined || tasks === null ? (
     <div className="table-loader-announcement1">
      <div>
       {/* eslint-disable-next-line jsx-a11y/alt-text */}
       <img src="https://img.icons8.com/external-outline-design-circle/66/null/external-Todo-List-shopping-and-ecommerce-outline-design-circle.png" />
       <p className="mt-3">No schedule found</p>
      </div>
     </div>
    ) : (
     <div className="Announcement-container-todo" >
      {tasks?.map((item: any, i: any) => (

       <div className="main-todo-Event"
        style={{ borderRadius: "4px" }}
        key={i} >
        <div className="main-todo-container">
         <div className="main-todo-note">
          <div>{item?.title?.slice(0, 65)}</div>
          <div className="main-todo-note-minutes">
           {moment.duration(moment().diff(item?.created_at)).humanize()}{" "} ago
          </div>
         </div>
        </div>
        <div
         className="FiTrash2"
         style={{ display: "flex" }} >

         <span style={{ marginRight: "1rem" }}>
          < ViewScheduleModal id={item?.id} />
         </span>
        </div>
       </div>
      ))}
     </div>
    )}
   </div>

  </div>
 );
};

export default Schedule;
