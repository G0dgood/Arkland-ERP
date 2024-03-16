

const QueryParams = (size: any, page: any, sort: any, limit: any, search: any, title: any, status: any, location: any, department: any, role: any, is_expatriate: any, category: any, base: any,) => {

	let baseURL = `${base}`;
	const queryParams = [];

	// Add 'size' to the query parameters if it's not null or undefined
	if (size !== null && size !== undefined && !Array.isArray(size)) {
		queryParams.push(`size=${size}`);
	}
	// Add 'page' to the query parameters if it's not null or undefined
	if (page !== null && page !== undefined && !Array.isArray(page)) {
		queryParams.push(`page=${page}`);
	}
	// Add 'sort' to the query parameters if it's not null or undefined
	if (sort !== null && sort !== undefined) {
		queryParams.push(`sort=${sort}`);
	}
	// Add 'limit' to the query parameters if it's not null or undefined
	if (limit !== null && limit !== undefined) {
		queryParams.push(`limit=${limit}`);
	}
	// Add 'search' to the query parameters if it's not null or undefined
	if (search !== null && search !== undefined) {
		queryParams.push(`search=${search}`);
	}
	// Add 'title' to the query parameters if it's not null or undefined
	if (title !== null && title !== undefined) {
		queryParams.push(`title=${title}`);
	}
	// Add 'status' to the query parameters if it's not null or undefined
	if (status !== null && status !== undefined) {
		queryParams.push(`status=${status}`);
	}
	// Add 'location' to the query parameters if it's not null or undefined
	if (location !== null && location !== undefined) {
		queryParams.push(`location=${location}`);
	}
	// Add 'department' to the query parameters if it's not null or undefined
	if (department !== null && department !== undefined) {
		queryParams.push(`department=${department}`);
	}
	// Add 'role' to the query parameters if it's not null or undefined
	if (role !== null && role !== undefined) {
		queryParams.push(`role=${role}`);
	}
	// Add 'is_expatriate' to the query parameters if it's not null or undefined
	if (is_expatriate !== null && is_expatriate !== undefined) {
		queryParams.push(`is_expatriate=${is_expatriate}`);
	}
	// Add 'category' to the query parameters if it's not null or undefined
	if (category !== null && category !== undefined) {
		queryParams.push(`category=${category}`);
	}
	// Combine the base URL and query parameters
	if (queryParams.length > 0) {
		baseURL += "?" + queryParams.join("&");
	}

	// Add 'id' to the URL if it's not null or undefined
	// if (id !== null && id !== undefined) {
	//   baseURL += `${id}`;
	// }
	console.log('baseURL', baseURL)
	return baseURL
}

export default QueryParams