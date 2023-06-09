import DataService from "../utils/dataService";
import { io } from "socket.io-client";


class SocketService {
  dataService = new DataService()  
		private token: any;  
	private socket = io(`https://arkland-erp.herokuapp.com`);
	
		constructor() {
				this.socket.on("notification-connected", (response: any) => console.log('Contected to Notification'))

	 } 
	emmitEvent(eventName: string, payload: Record<string, any> = {}) {  
							this.token = this.dataService.getToken() 
						this.socket.emit( eventName, { token: this.token, ...payload }); 
						
					}
	
	getSocket() {
		return this.socket
	} 
  
}

export default new SocketService();

 