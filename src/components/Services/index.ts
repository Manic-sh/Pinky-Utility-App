const apiUrl = 'https://utility.pinkytravels.com/api/UtilityAPI/';
const GetHomePageData = "GetHomePageData";
const GetSubCategory = "GetSubCategory";
const GetOperatorDetails = "GetOperatorDetails";
const GetCircle = "GetCircle";
const FetchPrepaidPlan = "FetchPrepaidPlan";
const FetchBillPlan = 'FetchBillPlan';
const DisplayCouponCode = "DisplayCouponCode";
const ApplyCouponCode = "ApplyCouponCode";
const getPaymentMethod = "GetPaymentMethod";
const headers = { 'Content-Type': 'application/json' };
export const userService = {
    getCategoriesList: async () => {
        try {
            const response = await fetch(apiUrl + GetHomePageData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const categorylists = json.paymentCategory;
            const responseCategories = categorylists.map((category: any) => {
                category.slug = category.PayCategory.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                return category;
            });

            return responseCategories;
        } catch (error) {
            console.error(error);
        }
    },
    getGetSubCategoryList: async (categoryId:Number) => {
        try {
            const response = await fetch(apiUrl + GetSubCategory + '?CategoryID=' + categoryId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const subCategoryList = json.categorylists;
            return subCategoryList;
        } catch (error) {
            console.error(error);
        }
    },
    getGetOperatorDetailsList: async (number:Number) => {
        try {
            const response = await fetch(apiUrl + GetOperatorDetails + '?Number=' + number, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    getGetCircleList: async (billerid:Number) => {
        try {
            const response = await fetch(apiUrl + GetCircle + '?billerid=' + billerid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const circles = json.circles;
            return circles;
        } catch (error) {
            console.error(error);
        }
    },
    allFetchPrepaidPlan: async (data:any) => {
        data = { billerid:"IDEAPRE", CircleName: "Delhi NCR" }
        try {
            const response = await fetch(apiUrl + FetchPrepaidPlan, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    fetchBillPlanList: async (data:any) => {

        try {
            const response = await fetch(apiUrl + FetchBillPlan, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    DisplayCouponCode: async (data :any) => {
        try {
            const response = await fetch(apiUrl + DisplayCouponCode, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    ApplyCouponCode: async (data:any) => {
        try {
            const response = await fetch(apiUrl + ApplyCouponCode, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    getPaymentMethodList: async (billerid:number) => {
        try {
            const response = await fetch(apiUrl + getPaymentMethod + "?billerid=" + billerid, {
                method: 'POST',
                headers: headers,
            });
            const json = await response.json();
            return json?.paymethodoption;
        } catch (error) {
            console.error(error);
        }
    }

};