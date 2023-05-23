<template>
  <div class="caintaner">
    <h1>Quản lý Sinh Viên</h1>
    <div>
      <label for="">Tìm kiếm: </label>
      <input type="text" v-model="textSeach" placeholder="Tên sinh viên ...." />
      <button @click="seachSinhVien">Seach</button>
    </div>
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Mã SV</td>
          <td>Tên sinh viên</td>
          <td>Ngày sinh</td>
          <td>Giới tính</td>
          <td>Khoa</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sinhVien, index) in sinhViens" :key="index">
          <td>
            <input
              type="checkbox"
              v-model="checkBoxSinhVien"
              :value="sinhVien.maSV"
            />
          </td>
          <td>{{ sinhVien.maSV }}</td>
          <td>{{ sinhVien.tenSV }}</td>
          <td>{{ sinhVien.ngaySinh }}</td>
          <td>{{ sinhVien.gioiTinh }}</td>
          <td>{{ sinhVien.khoa }}</td>
          <td>
            <button class="del-btn" @click="deleteTask(index)">Delete</button>
          </td>
          <td>
            <button class="edit-btn" @click="EditTask(index)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form-input">
      <div>
        <label for="">MaSV: </label>
        <input type="text" v-model="maSV" />
      </div>
      <div>
        <label for="">TenSV:</label>
        <input type="text" v-model="tenSV" />
      </div>
      <div>
        <label for="">Ngày sinh:</label>
        <input type="date" v-model="ngaySinh" />
      </div>
      <div>
        <label for="">Giới tính:</label>
        <input type="radio" v-model="gioiTinh" name="gioitinh" value="Nam" />Nam
        <input type="radio" v-model="gioiTinh" name="gioitinh" value="Nữ" />Nữ
      </div>
      <div>
        <label for=""> Khoa:</label>
        <select v-model="khoa">
          <option value="Toán">Toán</option>
          <option value="Lý">Lý</option>
          <option value="Hóa">Hóa</option>
          <option value="Anh">Anh</option>
          <option value="Văn">Văn</option>
          <option value="Sử">Sử</option>
          <option value="Địa">Địa</option>
        </select>
      </div>
      <div>
        <button class="btn" @click="SubmitTask">Submit</button
        ><button class="btn" style="margin-left: 10px" @click="DeleteCheckBox">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maSV: "",
      tenSV: "",
      ngaySinh: "",
      gioiTinh: "Nam",
      khoa: "Toán",
      editSinhVien: null,
      checkBoxSinhVien: [],
      textSeach: "",
      sinhViens: [
        {
          maSV: "A01",
          tenSV: "Nguyễn Anh Tuấn",
          ngaySinh: "2001-01-01",
          gioiTinh: "Nam",
          khoa: "Toán",
        },
        {
          maSV: "A02",
          tenSV: "Phạm Thị Hồng Nhung",
          ngaySinh: "2002-02-02",
          gioiTinh: "Nữ",
          khoa: "Lý",
        },
        {
          maSV: "A03",
          tenSV: "Trần Minh Quang",
          ngaySinh: "2003-03-03",
          gioiTinh: "Nam",
          khoa: "Hóa",
        },
        {
          maSV: "A04",
          tenSV: "Phạm Hữu Đức",
          ngaySinh: "2004-04-04",
          gioiTinh: "Nam",
          khoa: "Sinh",
        },
        {
          maSV: "A05",
          tenSV: "Vũ Thị Thu Hà",
          ngaySinh: "2005-05-05",
          gioiTinh: "Nữ",
          khoa: "Sử",
        },
        {
          maSV: "A06",
          tenSV: "Ngô Xuân Phúc",
          ngaySinh: "2006-06-06",
          gioiTinh: "Nam",
          khoa: "Địa",
        },
        {
          maSV: "A07",
          tenSV: "Bùi Thị Ngọc Ánh",
          ngaySinh: "2007-07-07",
          gioiTinh: "Nữ",
          khoa: "Văn",
        },
        {
          maSV: "A08",
          tenSV: "Đỗ Thị Mai Anh",
          ngaySinh: "2008-08-08",
          gioiTinh: "Nữ",
          khoa: "Anh",
        },
        {
          maSV: "A09",
          tenSV: "Vũ Đức Thắng",
          ngaySinh: "2009-09-09",
          gioiTinh: "Nam",
          khoa: "Toán",
        },
        {
          maSV: "A10",
          tenSV: "Lê Thị Kim Anh",
          ngaySinh: "2010-10-10",
          gioiTinh: "Nữ",
          khoa: "Văn",
        },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      this.sinhViens.splice(index, 1);
    },

    EditTask(index) {
      this.editSinhVien = index;

      this.maSV = this.sinhViens[index].maSV;
      this.tenSV = this.sinhViens[index].tenSV;
      this.ngaySinh = this.sinhViens[index].ngaySinh;
      this.gioiTinh = this.sinhViens[index].gioiTinh;
      this.khoa = this.sinhViens[index].khoa;
    },

    SubmitTask() {
      if (this.editSinhVien != null) {
        // this.sinhViens[this.editSinhVien].maSV = this.maSV;
        this.sinhViens[this.editSinhVien].tenSV = this.tenSV;
        this.sinhViens[this.editSinhVien].ngaySinh = this.ngaySinh;
        this.sinhViens[this.editSinhVien].gioiTinh = this.gioiTinh;
        this.sinhViens[this.editSinhVien].khoa = this.khoa;
        this.editSinhVien = null;
      } else {
        this.sinhViens.push({
          maSV: this.maSV,
          tenSV: this.tenSV,
          ngaySinh: this.ngaySinh,
          gioiTinh: this.gioiTinh,
          khoa: this.khoa,
        });
      }
    },

    DeleteCheckBox() {
      console.log(this.checkBoxSinhVien);
      let newListSinhVien = [];
      for (let i = 0; i < this.sinhViens.length; i++) {
        if (this.checkBoxSinhVien.indexOf(this.sinhViens[i].maSV) === -1) {
          newListSinhVien.push(this.sinhViens[i]);
        }
      }
      this.sinhViens = newListSinhVien;
    },

    seachSinhVien() {
      let newListSinhVien = this.sinhViens.filter((item) => {
        return item.tenSV.toLowerCase().includes(this.textSeach.toLowerCase());
      });
      this.sinhViens = newListSinhVien;
    },
  },
};
</script>

<style scoped>
.form-input div {
  margin-bottom: 5px;
  text-align: start;
}

label {
  margin-right: 5px;
}

.caintaner {
  max-width: 1200px;
  margin: auto;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.btn {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: teal;
  color: white;
}

.del-btn {
  border: none;
  background-color: red;
  color: white;
}

.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;
}
</style>
