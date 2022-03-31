import React, { Component } from 'react'
import { connect } from 'react-redux'
class FormThongTinSV extends Component {
    state = {
        values: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        },
        errors: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        },
        keywords: '',

    }
    handleInput = (event) => {
        const { value, name, type } = event.target;
        let errorsMessage = ''
        if (value.trim() == '') {
            if (name == 'maSV') {
                errorsMessage = 'Mã sinh viên Không được để trống'


            } else if (name == 'hoTen') {
                errorsMessage = 'Họ tên Không được để trống'

            } else if (name == 'sdt') {
                errorsMessage = 'Số điện thoại Không được để trống'
            } else {
                errorsMessage = 'Email Không được để trống'
            }
        }
        // let checkID = this.props.mangSinhVien.find(sv => sv.maSV === value)
        // if (checkID) {
        //     errorsMessage = 'Mã đã tồn tại'
        //     console.log(errorsMessage)
        // }
        if (name == 'hoTen') {
            var patternString = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
            // var pattern = new RegExp(patternString);
            if (!patternString.test(value)) {
                errorsMessage = 'Tên phải là kí tự'
            }
        }
        if (name == 'sdt') {
            let regex = /^[0-9]+$/;
            if (!value.match(regex)) {
                errorsMessage = 'Số điện thoại phải là số'
            }
        }
        if (type == 'email') {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!value.match(regex)) {
                errorsMessage = 'Email phải đúng định dạng'
            }
        }
        let values = {
            ...this.state.values, [name]: value
        }
        let errors = {
            ...this.state.errors, [name]: errorsMessage
        }

        this.setState({
            values: values,
            errors: errors,
        })


    }
    handleSearch = (event) => {
        let { value } = event.target;

        this.setState({
            keywords: value,
        }, () => {
            let action = {
                type: 'TIM_KIEM_SINH_VIEN',
                keyword: this.state.keywords
            }
            this.props.dispatch(action)
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        const { values } = this.state;
        for (let value in values) {
            let errorsMessage = ''
            if (values[value] === '') {
                errorsMessage = value + ' Không được để trống'
                isValid = false;
            }
            let checkID = this.props.mangSinhVien.some(sv => sv.maSV === values[value])
            console.log( checkID)
            if (checkID === true) {
                console.log('Mã đã tồn tại')
                errorsMessage = 'Mã đã tồn tại'
                isValid = false;
            }
            let errorNew = {
                ...this.state.errors,
                [value]: errorsMessage
            }
            console.log(errorNew)
            await this.setState({
                errors: errorNew
            })

        }
        console.log(isValid)
        if (isValid) {
            let action = {
                type: 'THEM_SINH_VIEN',
                sv: this.state.values,
            }
            this.props.dispatch(action)
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({ values: newProps.thongTinSV });
    }
    render() {
        const { errors, values } = this.state;
        const { disabledThem, disabledCapNhat, disabledInput } = this.props;
        // let values = this.props.thongTinSV
        return (
            <div className="">
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h4>Thông tin sinh viên</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="col-6 text-left my-2">
                                    <label>Mã sinh viên</label>
                                    {disabledInput ? <input disabled type="text" className="form-control" name="maSV" value={values.maSV} onChange={this.handleInput} /> : <input type="text" className="form-control" name="maSV" value={values.maSV} onChange={this.handleInput} />}
                                    <span className="text-danger">{errors.maSV}</span>
                                </div>
                                <div className="col-6 text-left my-2">
                                    <label>Họ tên</label>
                                    <input type="text" className="form-control" name="hoTen" value={values.hoTen} onChange={this.handleInput} />
                                    <span className="text-danger">{errors.hoTen}</span>
                                </div>
                                <div className="col-6 text-left my-2">
                                    <label>Số điện thoại</label>
                                    <input type="text" className="form-control" name="sdt" value={values.sdt} onChange={this.handleInput} />
                                    <span className="text-danger">{errors.sdt}</span>

                                </div>
                                <div className="col-6 text-left my-2">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" value={values.email} onChange={this.handleInput} />
                                    <span className="text-danger">{errors.email}</span>
                                </div>
                                {
                                    disabledThem ? <button disabled className="btn btn-success">Thêm sinh viên</button> : <button className="btn btn-success">Thêm sinh viên</button>
                                }
                                {

                                    disabledCapNhat ? <button disabled type="button" className="btn btn-primary mx-2" onClick={() => {
                                        let action = {
                                            type: 'CAP_NHAT_SINH_VIEN',
                                            svCapNhat: this.state.values,
                                        }
                                        this.props.dispatch(action)
                                    }}>Cập nhật sinh viên</button> : <button type="button" className="btn btn-primary mx-2" onClick={() => {
                                        let action = {
                                            type: 'CAP_NHAT_SINH_VIEN',
                                            svCapNhat: this.state.values,
                                        }
                                        this.props.dispatch(action)
                                    }}>Cập nhật sinh viên</button>
                                }

                            </div>
                        </form>

                    </div>
                </div>
                <form className="my-4">
                    <div className="form-row">
                        <div className="col-6">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={this.state.keywords} onChange={this.handleSearch} />

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        thongTinSV: rootReducer.QLSVReducer.thongTinSV,
        mangSinhVien: rootReducer.QLSVReducer.mangSinhVien,
        disabledThem: rootReducer.QLSVReducer.disabledThem,
        disabledCapNhat: rootReducer.QLSVReducer.disabledCapNhat,
        disabledInput: rootReducer.QLSVReducer.disabledInput,
    }
}
export default connect(mapStateToProps)(FormThongTinSV)