export function checkForName(id: any, dataParam?: any): any {
  let name = [] as any;
  dataParam &&
    dataParam.forEach((data: any) => {
      if (id === data.id) {
        name = data.name;
      }
    });
  return name;
}

export function checkForEmployee(id: any, employee?: any): any {
  let name = [] as any;
  employee &&
    employee.forEach((data: any) => {
      if (id === data.id) {
        name = data.full_name;
      }
    });
  return name;
}

export function checkForTeams(id: any, teams?: any): any {
  let name = [] as any;
  teams &&
    teams.forEach((team: any) => {
      if (id === team.id) {
        name = team.name;
      }
    });
  return name;
}

export function checkForEmployeeName(id: any, datas?: any): any {
  let name = [] as any;
  datas &&
    datas?.forEach((data: any) => {
      if (id === data.id) {
        name = data.employee_name;
      }
    });
  return name;
}
