export const TEMERATURE = 0.1;
export const MAX_TOKENS = 10000;
export const TOP_P = 1;
export const FREQUENCY_PENALTY = 0;
export const PRESENCE_PENALTY = 0;


export const coms={
    "get_report_detail":`Từ các báo Cáo trên \n
                  1. Hãy tổng hợp để đưa ra bản số liệu trong ngày( chỉ ghi số liệu tổng kết)\n
                  2. Đưa ra nhận xét
                  (trả lời dưới dạng markdown (chỉ ghi câu trả lời ))`,
    "get_overview_report":"Từ các báo Cáo trên,hãy tổng hợp để đưa ra bản số liệu trong ngày( chỉ ghi số liệu tổng kết)",
    "compare":`1.Đưa ra bảng so sánh Báo Cáo (trả lời dưới dạng mark down v2 )
               2. Đưa ra nhận xét
               (trả lời dưới dạng markdown (chỉ ghi câu trả lời))`
}
export type ComsType='get_report_detail' | 'get_overview_report' | 'compare';
export const dateRegex=/\d{2}\/\d{2}/;

