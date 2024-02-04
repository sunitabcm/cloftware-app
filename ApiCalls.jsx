import axios from 'axios';
import { setAuthToken } from './store/slices/authSlice';
import { updateUser } from './store/slices/userSlice';
import { saveAuthUserData } from './authStorage';
const baseURL = "https://api.cloftware.com/api/app";

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
export async function verifyOtpPasswordReset(value, otp) {
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
export async function verifyLoginOtp(number, otp) {
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
export async function getSchoolEventList(accessToken, year, date, limit = '5', offset = '0') {
    try {
        const response = await axios.post(
            `${baseURL}/event/get_event_list`,
            {
                offset: offset,
                limit: limit,
                year_id: year,
                year_month: date,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
export async function getSchoolHolidayList(accessToken, year, date, limit = '5', offset = '0') {
    try {
        const response = await axios.post(`${baseURL}/event/get_holiday_list`, {
            offset: offset,
            limit: limit,
            year_id: year,
            year_month: date,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
export async function getStudentProfile(dispatch, accessToken, limit = '5', offset = '0') {
    try {
        const response = await axios.post(`${baseURL}/get_profile`, {
            offset: offset,
            limit: limit,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            const userData = response.data.body;

            // Ensure userData is an object and stringify it if needed
            const userDataString = typeof userData === 'object' ? JSON.stringify(userData) : userData;
            dispatch(updateUser(userData));
            saveAuthUserData(JSON.stringify(userData))
        }
    } catch (error) {
        console.error('Error getting student profile:', error);
        dispatch(updateUser(null));
        throw error;
    }
}

// Function to change password
export async function changePassword(oldPass, newPass, accessToken) {
    try {
        const response = await axios.post(`${baseURL}/change_password`, {
            'old_password': oldPass,
            'new_password': newPass,
            'confirm_password': newPass,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
                'Authorization': `Bearer ${accessToken}`,
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

export async function getSchoolDetails(accessToken) {
    try {
        const response = await axios.get(`${baseURL}/get_school_details`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
export async function getNoticeBoardList(schoolId, accessToken) {
    try {
        const response = await axios.post(`${baseURL}/notice/notice_board_list`, {
            'school_id': schoolId,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
                'Authorization': `Bearer ${accessToken}`,
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
                'Authorization': `Bearer ${accessToken}`,
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

export async function updateProfile(accessToken, values, image) {
    let formData;
    if(image !== undefined){
        formData = {
            'profile_image': values,
        }
    } else {
        formData = {
            'current_address': values?.current_address,
            'phone_number': values?.phone_number,
            'emg_contact_number': values?.emg_contact_number,
            'emg_contact_name': values?.emg_contact_name,
            'emg_email_id': values?.emg_email_id,
            'emg_relationship_to_student': values?.emg_relationship_to_student,
        }
    }
    try {
        const response = await axios.post(`${baseURL}/edit_profile`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error updating profile and fetching attendance calendar:', error);
        throw error;
    }
}

export async function imageUpload(fileUrl, fileName, loginWebToken) {
    const formData = new FormData();
    formData.append('file', {
        uri: fileUrl,
        type: 'image/*',
        name: fileName,
        filename: 'imageFile',
    });
    formData.append('folder', 'profile_images/student');

    try {
        const response = await axios.post(`${baseURL}/file_upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + loginWebToken,
            },
        });
        const responseData = response.data
        if (response.status === 200 || response.status === 201) {
            return responseData.body;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export async function getHomeAssignmentList(accessToken, classId, sectionId, yearid, date) {
    try {
        const response = await axios.get(`${baseURL}/home_assignment_list`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                class_id: classId,
                section_id: sectionId,
                // year_id: yearid,
                year_month: date,
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting Home Assignment List:', error);
        throw error;
    }
}

export async function getBookScheduleList(accessToken, schoolId, classId, sectionId) {
    try {
        const response = await axios.get(`${baseURL}/book_schedule_list`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                school_id: schoolId,
                class_id: classId,
                section_id: sectionId,
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting Book Schedule List:', error);
        throw error;
    }
}

export async function getTimeTableList(accessToken, schoolId, classId, sectionId) {
    try {
        const response = await axios.get(`${baseURL}/time-table`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                school_id: schoolId,
                class_id: classId,
                section_id: sectionId,
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting Book Schedule List:', error);
        throw error;
    }
}
