import tenantsModel from "../models/tenants.model.mjs";

// function to update tenant's fcm token
 const updateTenantFCMToken = (tenantId, fcmToken) => {
  const tenant = tenantsModel.findById(tenantId);
  if (tenant) {
    let payload = new tenantsModel.findByIdAndUpdate(
      tenantId,
      { fcm_token: fcmToken },
      { new: true }
    );
    return payload;
  } else {
    console.log("tenant not found");
  }
 };

export { 
     updateTenantFCMToken
 }
