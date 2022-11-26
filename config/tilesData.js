
const tileData = (reqData , resData  ) => {
    if(reqData){
      let tileData=reqData;
      let tileList = []
      tileData.forEach((tile) => {
              
          switch (tile.moduleId) {
            case 1: // =====MODULE ADMIN======
            if (tile.tileName == "Order Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/orderManagement.png",
                    filePath :"admin/module/service/order/management"
                })
            }
            if (tile.tileName == "Deliver Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/orderManagement.png",
                    filePath :"admin/module/service/deliver/management"

                })
            }
            if (tile.tileName == "Users Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/userManagement.png",
                    filePath :"admin/module/service/user/management"
                })
            }
            //=======
            if (tile.tileName == "Roles Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/roleManagement.png",
                    filePath :"admin/module/service/role/management"
                })
            }
             //=======
             if (tile.tileName == "Query Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/queryManagement.png",
                    filePath :"admin/module/service/query/management"

                })
            }
             //=======
             if (tile.tileName == "Category Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/catgMangmnt.png",
                    filePath :"admin/module/service/product/category/management"
                })
            }
             //=======
             if (tile.tileName == "Service Address") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/SAddress.png",
                    filePath :"admin/module/service/address/management"
                })
            }
            //=======
            if (tile.tileName == "Product Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/productMangmnt.png",
                    filePath :"admin/module/service/product/management"
                })
            }
            break;
            case 2 : // COMMON MODULE
            if (tile.tileName == "Tile Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/tilemanagement.png"
                })
            }
            if (tile.tileName == "Module Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/modulemanagement.png"
                })
            }
            case 3: // ====MODULE DELIVERY=====
            if (tile.tileName == "Current orders") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/currentOrder.png"
                })
            }
            //=======
            if (tile.tileName == "Delivered orders") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/deliveredOrder.png"
                })
            }
            break;
            case 5: // =========MODULE SUPPLIER===== 
            if (tile.tileName == "Order Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/orderManagement.png"
                })
            }
            //=======
            if (tile.tileName == "Consumers Management") {
                tileList.push({
                    tPId: tile.id,
                    tileId: tile.tileId,
                    moduleId: tile.moduleId,
                    tileName: tile.tileName,
                    IconUrl: "./assets/Icons/cnsumrMangmnt.png"
                })
            }
            break;
        }
      })
             resData(null , tileList )
    } else {
          resData("not found" , null)
    }
         //let moduleList = res
  
  }
  module.exports = tileData;