import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import GlobalInputs from './GlobalInputs';
// dateValue = 'current' ;
// dayjs().format('YYYY-MM-DD HH:mm:ss'); // 2022-01-05 14:30:45
// dayjs().format('MMM DD, YYYY'); // Jan 05, 2022
// dayjs().format('dddd'); // Wednesday
// dayjs().format('MMMM YYYY');
// dayjs('1999-01-01').fromNow(true) // 22 years
// dayjs('1999-01-01').fromNow() // 22 years ago
export default function GlobalDatePicker({ dateValue, onDateChange, placeholderVal = 'Start Date', nameVal = 'startDate', errorStatus = false, year = false, classname }) {
    const [isDate, setIsDate] = useState(dateValue || '');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const convertApiDateToReadableFormat = (apiDate) => {
        if (apiDate === '') {
            return apiDate;
        } else {
            return dayjs(apiDate).format('MMMM YYYY');
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        const formattedDate = dayjs(date).format();
        setIsDate(formattedDate);
        if (year === true) {
            onDateChange(dayjs(date).format('YYYY'));

        } else {
            onDateChange(dayjs(date).format('YYYY-MM-DD'));

        }
    };

    return (
        <>
            <GlobalInputs
                mainClass={classname}
                placeholder={placeholderVal}
                name={nameVal}
                label={placeholderVal}
                disabled={true}
                clickable={true}
                onClick={showDatePicker}
                value={convertApiDateToReadableFormat(isDate)}
                error={errorStatus === true ? true : false}
                touched={errorStatus === true ? true : false}
                blurOnSubmit={false}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}