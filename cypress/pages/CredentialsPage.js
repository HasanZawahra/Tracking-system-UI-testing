const locators = {
    track_button: "body > div.container > div.form > button",
    id_field: "#trackingId",
    passwordfield: "#password",
    success_message: "body > div.message.success",
    error_message: "body > div.message.error",
    contentDiv: "#stages",
    stages: ".stage",
    done: ".done",
    pending: ".pending",
    rejected: ".rejected"
}

class credentialsPage {

    
    clickTrackButton(){
        return cy.get(locators.track_button).click(); 
    }
     
    enterId(id){
        return cy.get(locators.id_field).type(id);
    }

    enterPassword(password){
        return cy.get(locators.passwordfield).type(password);
    }

    checkSuccessMessage(message){
        return cy.get(locators.success_message).contains(message);
    }

    checkErrorMessage(message){
        return cy.get(locators.error_message).contains(message);
    }

    checkVisibilityBefore() {
        return cy.get(locators.contentDiv).should('not.be.visible');
    }
    

    checkVisibilityAfter(one, two, three, four, five, six, done, pending, rejected){
        const arr = [one, two, three, four, five, six]
        const commands =  [
            cy.get(locators.contentDiv).should('be.visible'),
            cy.get(locators.stages).should('have.length', 6),
            cy.get(locators.done).should('have.length', 6).contains(done),
            cy.get(locators.pending).should('have.length', 6).contains(pending),
            cy.get(locators.rejected).should('have.length', 6).contains(rejected),
            cy.get(locators.stages).should('be.visible')]
            for (let i = 0; i < 6; i++) {
                commands.push(cy.getHeader(i+1, arr[i]))
            }
            return commands
        
    }
}

export const cp = new credentialsPage();