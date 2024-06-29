import axios from 'axios';
import { setAuthToken } from './store/slices/authSlice';
import { updateUser } from './store/slices/userSlice';
import { saveAuthTeacherData, saveAuthUserData } from './authStorage';
import { updateUserTeacher } from './store/slices/teacherSlice';
import { setSelectedClass } from './store/slices/classSlice';

const baseURL = "https://apidev.cloftware.com/api/app";
const Schoolid = 13

export async function login(email, password) {
    const response = await axios.post(
        `${baseURL}/login`,
        {
            'emailOrPhoneNumber': email,
            'password': password,
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
        console.error('Error logging in:', response.message);
        throw new Error(response.message);
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

export async function getProfileTeacher(dispatch, accessToken, limit = '5', offset = '0') {
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



export async function attendanceGetStudentList(token, classId, sectionId, offset = 0, limit = 20) {
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

export async function getAssignmentList(token, classid ,sectionid) {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/assignment_list`,
            {
                offset: "0",
                limit: "10",
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


export async function assignmentDetails(assignment_id) {
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


export async function addEditAssignment() {
    try {
        const response = await axios.post(
            `${baseURL}/teacher/add_edit_assignment`,
            {
                class_id: '60',
                section_id: '74',
                subject_id: '1',
                due_date: '2024-06-23',
                title: 'Home work',
                description: 'Home work',
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


export async function deleteAssignment(assignmentId) {
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




export async function getAssignedTeacherSubjectList(classId, sectionId) {
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




export async function addEditSchedule() {
    try {
        const response = await axios.post(`${baseURL}/teacher/add_edit_schedule`, {
            class_id: '3',
            section_id: '14',
            title: 'Teacher class book',
            book_schedule_id: '22',
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
        console.error('Error in Add/Edit Schedule API:', error);
        throw error;
    }
};




export async function getScheduleList(token,classId, sectionId) {
    try {
        const response = await axios.post(`${baseURL}/teacher/get_schedule_list`, {
            class_id: classId,
                section_id: sectionId,
            offset: '0',
            limit: '20',
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
        const response = await axios.post(`${baseURL}/pdf_and_image_file_upload`, formData, {
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
    const response = await axios.post(`${baseURL}/add_edit_assignment`, assignmentData, {
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
    const response = await axios.post(`${baseURL}/get_teacher_class_sections_list`, {}, {
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
    const response = await axios.post(`${baseURL}/assigned_subject_list`, {
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



