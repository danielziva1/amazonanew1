
import React from "react";

export default class ContactUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
     
                <div className='sii'> 
                    
        <div id="form-main">
         <div id="form-div">
             
         <h1>שירות לקוחות</h1>
          <form class="form" id="form1"  onSubmit={this.submitForm}
        action="https://formspree.io/f/mbjpqzak"
        method="POST">
            
            <p class="name">
              <input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="שם" id="name" />
            </p>
            
            <p class="email">
              <input name="email" type="text" class="validate[required,custom[email]] feedback-input" id="email" placeholder="מייל" />
            </p>
            
            <p class="text">
              <textarea name="text" class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="הודעה"></textarea>
            </p>
            {status === "SUCCESS" ? <p className="dan">פנייתך התקבלה אנו נחזור אלייך בתוך 3 ימי עסקים</p> :      <div class="submit">
              <input type="submit" value="שלח פנייה" id="button-blue"/>
              <div class="ease"></div>
            </div>}
        {status === "ERROR" && <p className="dan">אופס... כנראה שחסרים פרטים!</p>}
            
      
          </form>
        </div>
        </div>
        </div>
    
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}






{/*
import React from 'react'

export default function ContactUsScreen() {
    return (
        
        <div id="form-main">
          
         <div id="form-div">
             
         <h1>שירות לקוחות</h1>
          <form class="form" id="form1">
            
            <p class="name">
              <input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Name" id="name" />
            </p>
            
            <p class="email">
              <input name="email" type="text" class="validate[required,custom[email]] feedback-input" id="email" placeholder="Email" />
            </p>
            
            <p class="text">
              <textarea name="text" class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Message"></textarea>
            </p>
            
            
            <div class="submit">
              <input type="submit" value="שלח פנייה" id="button-blue"/>
              <div class="ease"></div>
            </div>
          </form>
        </div>
        </div>
    )
}
*/}