import axios from 'axios';
import { setAuthToken } from './store/slices/authSlice';
import { updateUser } from './store/slices/userSlice';
import { saveAuthTeacherData, saveAuthUserData } from './authStorage';
import { updateUserTeacher } from './store/slices/teacherSlice';
import { setSelectedClass } from './store/slices/classSlice';

const baseURL = "https://apidev.cloftware.com/api/app";
const Schoolid = 13
// const roleId = 4;
export async function login(email, password, roleId) {
    const response = await axios.post(
        `${baseURL}/login`,
        {
            'emailOrPhoneNumber': email,
            'password': password,
            'school_id': Schoolid,
            'role_id': roleId
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
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request data:', error.request);
            throw new Error('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            throw new Error('Error in setting up the request.');
        }
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
    const response = await axios.post(
        `${baseURL}/verify_login_otp`,
        {
            'emailOrPhoneNumber': number,
            'otp': otp,
            'school_id': Schoolid
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
        console.error('Error verifying login OTP:', response.message);
        throw new Error(response.message);
    }
}


// Function to get school event list
export async function getSchoolEventList(accessToken, year, date, limit = '100', offset = '0') {
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
export async function getSchoolHolidayList(accessToken, year, date, limit = '100', offset = '0') {
    let formData;
    if (date) {
        formData = {
            offset: offset,
            limit: limit,
            year_id: year,
            year_month: date,
        }
    } else {
        formData = {
            offset: offset,
            limit: limit,
            year_id: year,
        }
    }
    try {
        const response = await axios.post(`${baseURL}/event/get_holiday_list`, formData, {
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
export async function getStudentProfile(dispatch, accessToken, limit = '100', offset = '0') {
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
            'student_id': student_id,
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
            'student_id': student_id,
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
    if (image !== undefined) {
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

export async function imageUpload(fileUrl, fileName, loginWebToken, folder) {
    const formData = new FormData();
    formData.append('file', {
        uri: fileUrl,
        type: 'image/*',
        name: fileName,
        filename: 'imageFile',
    });
    formData.append('folder', folder ? folder : 'profile_images/student');

    try {
        const response = await axios.post(`${baseURL}/file_upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + loginWebToken,
            },
        });
        const responseData = response.data
        if (response.status === 200 || response.status === 201) {
            return responseData;
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
                class_id: '1',
                section_id: '1',
                // year_id: yearid,
                date: date,
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

export async function getExamList(accessToken, schoolId, classId, sectionId) {
    try {
        const response = await axios.get(`${baseURL}/exam_list`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                // school_id: schoolId,
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

export async function getSchoolImportantDatesList(accessToken) {
    try {
        const response = await axios.get(`${baseURL}/get_important_list`, {
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
        console.error('Error getting Book Schedule List:', error);
        throw error;
    }
}

export async function getNotificationList(accessToken) {
    try {
        const response = await axios.get(`${baseURL}/notification_list`, {
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
        console.error('Error getting Book Schedule List:', error);
        throw error;
    }
}

export async function getFeeList(token) {
    try {
        const response = await axios.get(`${baseURL}/get_fee_list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting fee list:", error);
        throw error;
    }
}

export async function getSupport(token) {
    try {
        const response = await axios.get(`${baseURL}/question_answer`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting fee list:", error);
        throw error;
    }
}

export async function markNotificationAsRead(token, notificationId) {
    try {
        const response = await axios.post(`${baseURL}/is_read_notification`, {
            notification_id: notificationId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
}

export async function RaiseIssue(token, issue, schoolId, phone, lastname, firstName, email) {
    const response = await axios.post(
        `${baseURL}/raise_a_issue`,
        {
            'email': email,
            'issue': issue,
            'school_id': schoolId,
            'phone': phone,
            'username': firstName + ' ' + lastname,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    );

    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return null;
    }
}

export async function getProfileTeacher(dispatch, accessToken, limit = '100', offset = '0') {
    try {
        const response = await axios.post(`${baseURL}/teacher/get_teacher_details`, {
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
            if (response.data.body.teacherSections) {
                const defaultClass = response.data.body.teacherSections.find((cls) => cls.is_class_teacher === 1);
                if (defaultClass) {
                    dispatch(setSelectedClass(defaultClass));
                }
            }
            const userDataString = typeof userData === 'object' ? JSON.stringify(userData) : userData;
            dispatch(updateUserTeacher(userData));
            saveAuthTeacherData(JSON.stringify(userData))
        }
    } catch (error) {
        console.error('Error getting student profile:', error);
        dispatch(updateUserTeacher(null));
        throw error;
    }
}

export async function getTeacherClassSectionList() {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/get_teacher_class_sections_list`,
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching teacher class and section list:', error);
        throw error;
    }
};


export async function ClassViewData(token, classId, sectionId) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/class_view_list`,
            {
                section_id: sectionId,
                class_id: classId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching attendance student list:', error);
        throw error;
    }
};



export async function attendanceGetStudentList(token, classId, sectionId, offset = 0, limit = 100) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/get_students_list`,
            {
                section_id: sectionId,
                class_id: classId,
                offset: offset,
                limit: limit,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching attendance student list:', error);
        throw error;
    }
};

export async function markAttendance(token, formData) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/add_bulk_attendance`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error marking attendance:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export async function getAssignmentList(token, classid, sectionid) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/assignment_list`,
            {
                offset: "0",
                limit: "100",
                section_id: sectionid,
                class_id: classid,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting assignment list:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export async function assignmentDetails(token, assignment_id) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/assignment_details`,
            {
                assignment_id: assignment_id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching assignment details:', error);
        throw error;
    }
};


export async function addEditAssignment(token, classid, sessionid, subjectid, date, title, description) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/add_edit_assignment`,
            {
                class_id: classid,
                section_id: sessionid,
                subject_id: subjectid,
                due_date: date,
                title: title,
                description: description,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error adding or editing assignment:', error);
        throw error;
    }
};


export async function deleteAssignment(token, assignmentId) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/delete_assignment`,
            {
                assignment_id: assignmentId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};




export async function getAssignedTeacherSubjectList(token, classId, sectionId) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/assigned_subject_list`,
            {
                class_id: classId,
                section_id: sectionId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};




export async function addEditSchedule(formData, token) {
    try {
        const response = await axios.post(`${baseURL}/teacher/add_edit_schedule`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error in Add/Edit Schedule API:', error);
        throw error;
    }
};




export async function getScheduleList(token, classId, sectionId) {
    try {
        const response = await axios.post(`${baseURL}/teacher/get_schedule_list`, {
            class_id: classId,
            section_id: sectionId,
            offset: '0',
            limit: '100',
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error in Get Schedule List API:', error);
        throw error;
    }
};





export async function getProfileData(accessToken, classId, sectionId, schoolId, date) {
    try {
        const response = await axios.post(`${baseURL}/teacher/calender_student_attendance`, {
            class_id: classId,
            section_id: sectionId,
            school_id: schoolId,
            date: date
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};

export async function uploadFileAPI(formData, loginWebToken) {
    // const formData = new FormData();
    // formData.append('file', {
    //     uri: fileUrl,
    //     type: type,
    //     name: fileName,
    //     filename: 'imageFile',
    // });
    // formData.append('folder', 'assignment');

    try {
        const response = await axios.post(`${baseURL}/teacher/pdf_and_image_file_upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + loginWebToken,
            },
        });
        const responseData = response.data
        if (response.status === 200 || response.status === 201) {
            return responseData;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const addEditAssignmentAPI = async (assignmentData, accessToken) => {
    try {
        const response = await axios.post(`${baseURL}/teacher/add_edit_assignment`, assignmentData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getClassListAPI = async (accessToken) => {
    try {
        const response = await axios.post(`${baseURL}/teacher/get_teacher_class_sections_list`, null, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSubjectListAPI = async (classId, sectionId, accessToken) => {
    try {
        const response = await axios.post(`${baseURL}/teacher/assigned_subject_list`, {
            class_id: classId,
            section_id: sectionId,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateTeacher = async (accessToken, values, image) => {
    const formData = new FormData();
        // formData.append('email', values.email);
        // formData.append('password', values.password);
        formData.append('school_id', values.scl_id);
        formData.append('title', values.title);
        // formData.append('first_name', values.first_name);
        // formData.append('last_name', values.last_name);
        // formData.append('dob', values.dob);
        // formData.append('gender', values.gender);
        // formData.append('nationality', values.nationality);
        formData.append('phone_number', values.phone_number);
        formData.append('marital_status', values.marital_status);
        formData.append('languages_spoken', values.languages_spoken);
        formData.append('address_line1', values.address_line1);
        formData.append('state', values.state);
        formData.append('city', values.city);
        formData.append('pin_code', values.pin_code);
        formData.append('country', values.country);
        formData.append('job_title', values.job_title);
        // formData.append('date_hiring', values.date_hiring);
        // formData.append('employment_status', values.employment_status);
        // formData.append('social_security_number', values.social_security_number);
        // formData.append('emergency_contact_name', values.emergency_contact_name);
        // formData.append('emergency_contact_relationship', values.emergency_contact_relationship);
        // formData.append('emergency_phone_number', values.emergency_phone_number);
        // formData.append('spouse_name', values.spouse_name);
        // formData.append('dependents', values.dependents);
        // formData.append('educational_qualifications', values.educational_qualifications);
        // formData.append('teaching_certifications', values.teaching_certifications);
        // formData.append('previous_teaching_experience', values.previous_teaching_experience);
        // formData.append('address_line2', values.address_line2);
        // formData.append('primary_teaching_location', values.primary_teaching_location);
        // formData.append('secondary_teaching_location', values.secondary_teaching_location);
        // formData.append('professional_development_courses', values.professional_development_courses);
        // formData.append('professional_development_certificates', values.professional_development_certificates);
        // formData.append('professional_development_goals', values.professional_development_goals);
        // formData.append('skills', values.skills);
        // formData.append('interests', values.interests);
        // formData.append('hobbies', values.hobbies);
        // formData.append('emp_id', values.emp_id);
        // formData.append('work_schedule', values.work_schedule);
        // formData.append('job_description', values.job_description);
        // formData.append('performance_evaluations', values.performance_evaluations);
        // formData.append('disciplinary_actions', values.disciplinary_actions);
        // formData.append('reason_for_termination', values.reason_for_termination);
        // formData.append('salary_amount', values.salary_amount);
        // formData.append('pay_frequency', values.pay_frequency);
        // formData.append('bank_name', values.bank_name);
        // formData.append('account_number', values.account_number);
        // formData.append('ifcs_code', values.ifcs_code);
        // formData.append('routing_number', values.routing_number);
        // formData.append('tax_information', values.tax_information);
        // formData.append('retirement_plan_information', values.retirement_plan_information);
        // formData.append('insurance_information', values.insurance_information);
        // formData.append('background_check_results', values.background_check_results);
        // formData.append('drug_test_results', values.drug_test_results);
        // formData.append('driving_record', values.driving_record);
        formData.append('teacher_id', values.teacher_id);
        // formData.append('middle_name', values.middle_name);
        formData.append('profile_image', image ? image : values.profile_image);

    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = await axios.post(`${baseURL}/teacher/update_teacher`, formData, config);
        return response.data;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
}
