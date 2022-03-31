import React, { Component } from 'react'
import { connect } from 'react-redux'
class TableThongTinSV extends Component {
    renderThongTinSV = () => {
        const { mangSinhVien, mangTimKiem } = this.props;
        if(mangTimKiem.length == 0 ){
            return mangSinhVien.map(sv => (
                <tr key={sv.maSV}>
                    <td>{sv.maSV}</td>
                    <td>{sv.hoTen}</td>
                    <td>{sv.sdt}</td>
                    <td>{sv.email}</td>
                    <td>
                        <button className=" mx-1 btn btn-danger" onClick={() => {
                            let action = {
                                type: 'XOA_SINH_VIEN',
                                maSV: sv.maSV
                            }
                            this.props.dispatch(action)
                        }}>Xóa</button>
                        <button className=" mx-1 btn btn-primary" onClick={() => {
                            let action = {
                                type: 'XEM_SINH_VIEN',
                                sv,
                            }
                            this.props.dispatch(action)
                        }}>Xem</button>
                    </td>
                </tr>
            ))
        }
        else{
            return mangTimKiem.map(sv => (
                <tr key={sv.maSV}>
                    <td>{sv.maSV}</td>
                    <td>{sv.hoTen}</td>
                    <td>{sv.sdt}</td>
                    <td>{sv.email}</td>
                    <td>
                        <button className=" mx-1 btn btn-danger" onClick={() => {
                            let action = {
                                type: 'XOA_SINH_VIEN',
                                maSV: sv.maSV
                            }
                            this.props.dispatch(action)
                        }}>Xóa</button>
                        <button className=" mx-1 btn btn-primary" onClick={() => {
                            let action = {
                                type: 'XEM_SINH_VIEN',
                                sv,
                            }
                            this.props.dispatch(action)
                        }}>Xem</button>
                    </td>
                </tr>
            ))
        }

       
    }
    render() {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Họ Tên</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderThongTinSV()}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        mangSinhVien: rootReducer.QLSVReducer.mangSinhVien,
        mangTimKiem: rootReducer.QLSVReducer.mangTimKiem,
        disabledThem: rootReducer.QLSVReducer.disabledThem,
        disabledCapNhat: rootReducer.QLSVReducer.disabledCapNhat,
    }
}
export default connect(mapStateToProps)(TableThongTinSV)