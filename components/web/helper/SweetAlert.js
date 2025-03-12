import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function SweetAlert({
    title = 'Notification',
    text = 'Are you sure about this action?',
    icon = 'warning',
    showCancelButton = false,
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel',
    callback = () => { },
    cbCancel = () => { },
}) {
    MySwal.fire({
        target: document.getElementById('form-modal'),
        title: <p>{title}</p>,
        text,
        icon,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
    }).then((result) => {
        console.log("resultresultresultresult", result)
        if (result.isConfirmed && typeof callback === 'function') {
            callback();
        } else if (result.dismiss === Swal.DismissReason.cancel && typeof cbCancel === 'function') {
            cbCancel();
        }
    });
}
