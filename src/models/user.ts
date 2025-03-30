export class User {
    ns_id: number = 0;
    ma: string = "";
    ten: string = "";
    loai: string = "";
    access_token: string = "";
    chuyen_mon: string = ""
    bo_phan: string = ""
    dien_thoai: string = ""
    phong_khoa: string = ""
    phong_kham: string = ""
    dia_chi: string = ""
    anh_chu_ky: string = ""
    chung_chi_nghe: string = ""
    username: string = ""
    privilege_codes: string[] = []
    ghi_chu: string = ""
    ngay_sinh: string = ""
    ngay_vao_lam: string = ""
    so_cmnd: string = ""
    anh_dai_dien: string = ""

    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}


