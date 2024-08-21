import React, { useState } from 'react';


const InfoModal = () => {
    const [showModal, setShowModal] = useState(true);
    const handleClose = () => setShowModal(false);

    return (
        <React.Fragment>

            {showModal && (
                <div className="modal show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content text-light">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Инфо</h5>
                            </div>
                            <div className="modal-body">
                                <h5>
                                    Пример промптови:
                                </h5>
                                - Информации за предметот Х
                                <br></br>
                                - Позитивно ( / негативно) за предметот Х
                                <br></br>
                                - Како се полага
                                <br></br>
                                - Дали има лабораториски
                                <hr></hr>

                                Препорачливо е разговорите да се започнуваат со промптот "Информации за предметот Х"
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleClose}>Во ред</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>

    )
}


export default InfoModal;
