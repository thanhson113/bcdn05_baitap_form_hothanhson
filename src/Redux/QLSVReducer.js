const QLSV = {
    mangSinhVien: [
        { maSV: '123', hoTen: 'Hồ Thanh Sơn', sdt: '0905113113', email: 'sonho1230@gmail.com' },
        { maSV: '456', hoTen: 'Nguyễn Văn Anh', sdt: '0905114114', email: 'vananh4567@gmail.com' },
        { maSV: '789', hoTen: 'Lê Quốc Khanh', sdt: '0905115115', email: 'quockhanh990@gmail.com' },
    ],
    thongTinSV: { maSV: '', hoTen: '', sdt: '', email: '' },
    mangTimKiem : [],
    disabledThem: false,
    disabledCapNhat: true,
    disabledInput: false,
    
}

export const QLSVReducer = (state = QLSV, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN':{
            let mangCapNhat = [...state.mangSinhVien];
            mangCapNhat = [...mangCapNhat,action.sv];
            state.mangSinhVien = mangCapNhat;
            state.thongTinSV = { maSV: '', hoTen: '', sdt: '', email: '' }
            return {...state};
        }
        case 'XOA_SINH_VIEN':{
            console.log(action)
            let mangFilter = state.mangSinhVien.filter(sv => sv.maSV !== action.maSV);
            state.mangSinhVien = mangFilter;
            return {...state}
        }
        case 'XEM_SINH_VIEN':{
           state.disabledInput = true;
           state.thongTinSV = action.sv;
           state.disabledThem = true;
           state.disabledCapNhat = false;
           return {...state}
        }
        case 'CAP_NHAT_SINH_VIEN':{
            let mangCapNhat = [...state.mangSinhVien];
            let index = mangCapNhat.findIndex(sv => sv.maSV === action.svCapNhat.maSV)
            if(index != -1){
                mangCapNhat[index] = action.svCapNhat
                state.mangSinhVien = mangCapNhat;
               
            }
            state.disabledInput = false;
            state.thongTinSV = { maSV: '', hoTen: '', sdt: '', email: '' }
            state.disabledThem = false;
            state.disabledCapNhat = true;
            return {...state};

        }
        case 'TIM_KIEM_SINH_VIEN': {
            let keywordsToLower = action.keyword.toLowerCase();
            let mangCapNhat = [...state.mangSinhVien];
            let mangFilter = mangCapNhat.filter(sv => sv.hoTen.toLowerCase().indexOf(keywordsToLower) !== -1);
            state.mangTimKiem = mangFilter;
            return {...state}
        }
        default: return state;
    }
}