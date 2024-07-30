"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRegex = exports.coms = exports.PRESENCE_PENALTY = exports.FREQUENCY_PENALTY = exports.TOP_P = exports.MAX_TOKENS = exports.TEMERATURE = void 0;
exports.TEMERATURE = 0.1;
exports.MAX_TOKENS = 10000;
exports.TOP_P = 1;
exports.FREQUENCY_PENALTY = 0;
exports.PRESENCE_PENALTY = 0;
exports.coms = {
    "get_report_detail": `Từ các báo Cáo trên \n
                  1. Hãy tổng hợp để đưa ra bản số liệu trong ngày( chỉ ghi số liệu tổng kết)\n
                  2. Đưa ra nhận xét
                  (trả lời dưới dạng markdown (chỉ ghi câu trả lời ))`,
    "get_overview_report": "Từ các báo Cáo trên,hãy tổng hợp để đưa ra bản số liệu trong ngày( chỉ ghi số liệu tổng kết)",
    "compare": `1.Đưa ra bảng so sánh Báo Cáo (trả lời dưới dạng mark down v2 )
               2. Đưa ra nhận xét
               (trả lời dưới dạng markdown (chỉ ghi câu trả lời))`
};
exports.dateRegex = /\d{2}\/\d{2}/;
