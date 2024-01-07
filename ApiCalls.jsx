import axios from 'axios';
import { setAuthToken } from './store/slices/authSlice';
const baseURL = "https://api.cloftware.com/api/app";

// const fetchData = async () => {
//   try {
//     const data = await login(email, password);
// console.log(data)
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// Function to login
export async function login(email, password) {
    try {
        const response = await axios.post(
            `${baseURL}/login`,
            {
                'emailOrPhoneNumber': email,
                'password': password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;

        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

// Function for Forgot Password
export async function forgotPassword(value) {
    try {
        const response = await axios.post(
            `${baseURL}/forgotpassword`,
            {
                'emailOrPhoneNumber': value,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
}

// Function to verify OTP for password reset
export async function verifyOtpPasswordReset(value , otp) {
    try {
        const response = await axios.post(
            `${baseURL}/verifyotp`,
            {
                'emailOrPhoneNumber': value,
                'otp': otp,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error verifying OTP for password reset:', error);
        throw error;
    }
}

// Function to reset password
export async function resetPassword(newPass, confirmPass, userID) {
    try {
        const response = await axios.post(
            `${baseURL}/resetPassword`,
            {
                'new_password': newPass,
                'confirm_password': confirmPass,
                'user_id': userID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

// Function for login via OTP
export async function loginViaOtp(num) {
    try {
        const response = await axios.post(
            `${baseURL}/send_login_otp`,
            {
                'emailOrPhoneNumber': num,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error in login via OTP:', error);
        throw error;
    }
}

// Function to verify login OTP
export async function verifyLoginOtp(number , otp) {
    try {
        const response = await axios.post(
            `${baseURL}/verify_login_otp`,
            {
                'emailOrPhoneNumber': number,
                'otp': otp,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error verifying login OTP:', error);
        throw error;
    }
}

// Function to get school event list
export async function getSchoolEventList(accessToken) {
    try {
        const response = await axios.post(
            `${baseURL}/event/get_event_list`,
            {
                offset: '0',
                limit: '5',
                'year_id': '1',
            },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting school event list:', error);
        throw error;
    }
}

// Function to get school holiday list
export async function getSchoolHolidayList(accessToken, year, limit = '5', offset = '0') {
    try {
        const response = await axios.post(`${baseURL}/event/get_holiday_list`, {
            offset: offset,
            limit: limit,
            year_id: year,
        }, {
            headers: {
                // 'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting school holiday list:', error);
        throw error;
    }
}

// Function to get student profile
export async function getStudentProfile(accessToken, year, limit = '5', offset = '0') {
    try {
        const response = await axios.post(`${baseURL}/get_profile`, {
            offset: offset,
            limit: limit,
            year_id: year,
        }, {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting student profile:', error);
        throw error;
    }
}

// Function to change password
export async function changePassword(accessToken) {
    try {
        const response = await axios.post(`${baseURL}/change_password`, {
            'old_password': '123456',
            'new_password': '12345678',
            'confirm_password': '12345678',
        }, {
            headers: {
                'Authorization': accessToken,
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}

// Function to logout
export async function logout(accessToken) {
    try {
        const response = await axios.get(`${baseURL}/logout`, {
            headers: {
                'Authorization': accessToken,
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}

// Function to get notice board list
export async function getNoticeBoardList(accessToken) {
    try {
        const response = await axios.post(`${baseURL}/notice/notice_board_list`, {
            'school_id': '30',
        }, {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting notice board list:', error);
        throw error;
    }
}

// Function to add/edit apply leave
export async function addEditApplyLeave(accessToken, class_id, section_id, year_id, reason, leave_date, student_id) {
    try {
        const response = await axios.post(`${baseURL}/leave/add_edit_apply_leave`, {
            'leave_date': leave_date,
            'status': 'Leave',
            'student_id': '2',
            'class_id': class_id,
            'section_id': section_id,
            'year_id': year_id,
            'reason': reason,
        }, {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error adding/editing leave:', error);
        throw error;
    }
}

// Function to get student attendance calendar
export async function getStudentAttendanceCalendar(accessToken, student_id, school_id, year, month) {
    try {
        const response = await axios.post(`${baseURL}/calender_student_attendance`, {
            'student_id': '1',
            'school_id': school_id,
            'year': year,
            'month': month,
        }, {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting student attendance calendar:', error);
        throw error;
    }
}


//with formdata 


// export async function getNoticeBoardList(accessToken, school_id) {
//     const formData = new FormData();
//     formData.append('school_id', '1');
//     try {
//         const response = await axios.post(`${baseURL}/notice/notice_board_list`, formData, {
//             headers: {
//                 'Authorization': accessToken,
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status === 200 || response.status === 201) {
//             return response.data;
//         } else {
//             return response.data;
//         }
//     } catch (error) {
//         console.error('Error getting notice board list:', error);
//         throw error;
//     }
// }

// // Function to add/edit apply leave
// export async function addEditApplyLeave(accessToken, class_id, section_id, year_id, reason, leave_date, student_id) {
//     const formData = new FormData();
//     formData.append('leave_date', leave_date);
//     formData.append('status', 'Leave');
//     formData.append('student_id', '2');
//     formData.append('class_id', class_id);
//     formData.append('section_id', section_id);
//     formData.append('year_id', year_id);
//     formData.append('reason', reason);
//     try {
//         const response = await axios.post(`${baseURL}/leave/add_edit_apply_leave`, formData, {
//             headers: {
//                 'Authorization': accessToken,
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status === 200 || response.status === 201) {
//             return response.data;
//         } else {
//             return response.data;
//         }
//     } catch (error) {
//         console.error('Error adding/editing leave:', error);
//         throw error;
//     }
// }

// // Function to get student attendance calendar
// export async function getStudentAttendanceCalendar(accessToken, student_id, school_id, year, month) {
//     const formData = new FormData();
//     formData.append('student_id', '1');
//     formData.append('school_id', school_id);
//     formData.append('year', year);
//     formData.append('month', month);
//     try {

//         const response = await axios.post(`${baseURL}/calender_student_attendance`, formData, {
//             headers: {
//                 'Authorization': accessToken,
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status === 200 || response.status === 201) {
//             return response.data;
//         } else {
//             return response.data;
//         }
//     } catch (error) {
//         console.error('Error getting student attendance calendar:', error);
//         throw error;
//     }
// }
