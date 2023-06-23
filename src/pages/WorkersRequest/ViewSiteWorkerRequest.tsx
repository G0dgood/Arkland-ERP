
import { useEffect } from 'react'
import projectBack from "../../assets/vectors/project-back.svg";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { BounceLoader } from 'react-spinners';
import { GiTeamIdea } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';
import { viewRequest } from '../../features/workerRequest/workerRequestSlice';
import moment from 'moment';
import { FiUserPlus } from 'react-icons/fi';
import { NoRecordFound } from '../../components/TableOptions';
import ApproveWorkerRequestModal from './ApproveWorkerRequestModal';
import RejectWorkerRequestModal from './RejectWorkerRequestModal';

const ViewSiteWorkerRequest = () => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const { id } = useParams<{ id: string }>();
 const { viewdata, viewisLoading } = useAppSelector((state: any) => state.worker)

 const { requests } = viewdata



 useEffect(() => {
  // @ts-ignore
  dispatch(viewRequest(id));
 }, [dispatch, id]);

 return (
  <div>
   {
    viewisLoading ? (
     <div className="isLoading-container-view" >
      <BounceLoader color={"#990000"} loading={viewisLoading} />
     </div>
    ) : !viewdata || viewdata === undefined ? (
     <div className="table-loader-announcement">
      <div >
       <GiTeamIdea size={80} />
       <p className="mt-3">No Request details</p>
      </div>
     </div>
    ) : (
     <div  >

      <div className="EssentialsContainer">
       <div className="employee-main-div-col">
        <div className="employee-main-div-col-header">
         <div>
          <img
           src={projectBack}
           alt="User"
           className="project-back-img"
           onClick={() => navigate(-1)}
           title="Return"
          />
         </div>
         <div className="employee-main-div-col-header-buttons">
          <RejectWorkerRequestModal id={viewdata?.id} />
          <ApproveWorkerRequestModal id={viewdata?.id} />

         </div>
        </div>

        <h4 style={{ marginTop: "3rem" }}>
         Task  Details
        </h4>
        <div>
         {/* <!-- Team --> */}
         <section id="team" className="pb-5">
          <div className="container">
           <h5 className="section-title h1">OUR TEAM</h5>
           <div className="row">
            {/* <!-- Team member --> */}
            {requests?.length === 0 ||
             requests == null ? (
             <div className='approval-request'>
              <NoRecordFound colSpan={9} />
             </div>
            ) : requests?.map((item: any, i: any) => (
             <div className="col-xs-12 col-sm-6 col-md-4" key={i}>
              <div className="image-flip"  >
               <div className="mainflip">
                <div className="frontside">
                 <div className="card">
                  <div className="card-body text-center">
                   <p>
                    <FiUserPlus size={80} />
                   </p>
                   <h4 className="card-title">{item?.role_name}
                   </h4>
                   <p className="card-text" style={{ color: "#000" }}>status: {viewdata?.status}</p>
                   <p className="card-text">Requested Quantity</p>
                   <a href="https://www.fiverr.com/share/qb8D02" className="btn btn-primary btn-sm">{item?.requested_quantity}</a>
                   <p className="card-text">Is urgent: {viewdata?.is_urgent === false ? "NO" : "YES"}</p>
                  </div>
                 </div>
                </div>
                <div className="backside">
                 <div className="card">
                  <div className="card-body text-center mt-4">
                   <h4 className="card-title">{item?.role_name}
                   </h4>
                   <p className="card-text">Requested Quantity: <a href="https://www.fiverr.com/share/qb8D02" className="btn btn-primary btn-sm">{item?.requested_quantity}</a></p>
                   <p className="card-text">Signed Employees: {!item?.signed_employees ? 0 : item?.signed_employees}</p>
                   <p className="card-text">Created Time: {moment(item?.created_at).format("DD-MMMM-YYYY")}</p>

                  </div>
                 </div>
                </div>
               </div>
              </div>
             </div>
            ))}
           </div>
          </div>
         </section>
         {/* <!-- Team --> */}

        </div>

       </div>
      </div>

     </div>
    )
   }
  </div>
 )
}

export default ViewSiteWorkerRequest