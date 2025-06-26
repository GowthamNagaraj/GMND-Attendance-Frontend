import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAttendanceReports(params) {
    try {
        const {userid,token} = params;

        const reports = await axios.post(`${API}/attendance/${userid}`,
            {},
            {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return reports.data.data;
    } catch (error) {
        console.error("Error in getAttendanceReports:", error);
        throw error
    }
}