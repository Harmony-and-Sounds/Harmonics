import React from "react";
import Popup from "reactjs-popup";

class ControlledPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
<>
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>

<div id="myModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel vehicula erat. Phasellus vestibulum leo eu mi tempor blandit. Suspendisse eget iaculis lectus. Donec vitae tempus enim, quis tristique magna. Donec lobortis, sem ac pretium viverra, leo nisl consequat arcu, sit amet ullamcorper nunc turpis ac erat. In rutrum auctor ligula, quis mattis enim lacinia eu. Aliquam at magna a erat laoreet iaculis quis a justo. Donec porttitor vulputate massa, nec suscipit nisi mollis sed.</p>
                <p>Praesent sit amet porttitor magna, auctor feugiat tellus. Sed venenatis tortor turpis, vel vestibulum eros pulvinar et. Pellentesque hendrerit diam quis dui euismod tincidunt. Sed sit amet mauris ipsum. Integer in magna tellus. In tincidunt mi quis nunc gravida sollicitudin. Aliquam ac dui eget erat consequat volutpat in eu magna.</p>
                <p>Sed feugiat bibendum leo consequat convallis. Donec facilisis, turpis a scelerisque venenatis, felis diam dictum tortor, vitae imperdiet tortor ligula eu lectus. Donec iaculis semper elementum. Nullam dapibus porttitor magna quis convallis. Morbi porttitor quam non magna ullamcorper rhoncus. Phasellus sit amet nunc at turpis pharetra luctus a a massa. Praesent luctus massa in odio faucibus eleifend.</p>
                <p>In eget lobortis leo, ut luctus odio. Mauris pharetra erat ac tellus hendrerit semper. Cras faucibus ipsum id ante hendrerit rutrum. Donec vitae ullamcorper arcu. Aliquam pellentesque faucibus placerat. Aliquam erat volutpat. In tincidunt metus sit amet ligula sagittis vehicula. Pellentesque velit quam, hendrerit a erat ac, fermentum tincidunt enim. Cras suscipit justo nec consectetur lacinia.</p>
                <p>Cras pellentesque urna a leo egestas, at ullamcorper augue suscipit. Nulla id lacinia magna, non iaculis est. Praesent a placerat augue, eget eleifend purus. Aenean dignissim, orci et rutrum facilisis, tellus massa porta nulla, quis hendrerit dui ipsum vitae urna. In mattis lectus dolor, id venenatis lectus pellentesque at. Suspendisse posuere metus vel bibendum dignissim. Fusce interdum magna id libero scelerisque suscipit. Duis orci augue, rhoncus eget pharetra ac, viverra nec magna. In accumsan nulla ac suscipit pellentesque. Nulla iaculis luctus tellus, at ultricies urna hendrerit a. Aenean vehicula sodales varius. Duis sodales hendrerit odio non sagittis.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

            </div>
        </div>

    </div>

</div>
</>

    );
  }
}


export default ControlledPopup;
