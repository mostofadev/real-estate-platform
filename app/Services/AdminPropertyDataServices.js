import adminInstance from "@/lib/axiosAdmin";

export const getAdminPropertyData = async () => {
    const response = await adminInstance.get('/property-data');
    return response.data;
}

export const getAdminPropertyDataFeatures = async () => {
    const response = await adminInstance.get('/property-data/features');
    return response.data;
}

export const getAdminPropertyDataDivisions = async () => {
    const response = await adminInstance.get('/property-data/divisions');
    return response.data;
}

export const getAdminPropertyDataDistricts = async (division_id) => {
    console.log('services division id', division_id);
    
    const response = await adminInstance.get('/property-data/districts', {
        params: { division_id }
    });
    console.log(response);
    
    return response.data;
}

export const getAdminPropertyDataSubDistricts = async (district_id) => {
    console.log('services district id', district_id);
    const response = await adminInstance.get('/property-data/subdistricts', {
        params: { district_id }
    });
    console.log(response);
    
    return response.data;
}

