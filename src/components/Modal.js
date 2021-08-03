import React, {useState} from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

//game instructions taken from: https://bicyclecards.com/how-to-play/rummy-rum/

const ModalInstructions = (props) => {

        const [modalOpen, setModalOpen] = useState(false)

        return (
          <>
            <Button
              className="instructions-button"
              color="primary"
              type="button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Instructions
            </Button>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
              <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                  Instructions - How to Play
                </h5>
                <button
                  aria-label="Close"
                  className=" close"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <ModalBody> 
                  <p><strong>Card Ranking</strong></p>
                  <p>A(high),K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2(low)</p>
                  <p><strong>The Deal</strong></p>
                  <p>The deck is divided evenly, with each player receiving 26 cards, dealt one at a timer face down, in front of them.</p>
                <p><strong>The Play</strong></p>
                <p>Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.</p> 
                <p>If the cards are the same rank, it is War. Each player turns up one card face down and one card face up.</p>
                <p>The player with the higher cards takes both piles (six cards).</p>
                <p>If the turned-up cards are again the same rank, each player places another card face down and turns another card face up.</p>
                <p>The player with the higher card takes all 10 cards, and so on.</p>
                <p><strong>Scoring</strong></p>
                <p>The game ends when one player has won all the cards.</p>
                </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  Close
                </Button>
                {/* <Button color="primary" type="button">
                  Save changes
                </Button> */}
              </ModalFooter>
            </Modal>
          </>
        );
}

export default ModalInstructions




