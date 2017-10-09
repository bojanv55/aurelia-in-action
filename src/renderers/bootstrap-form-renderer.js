import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class BootstrapFormRenderer {
  render(instruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element, result) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // add the has-error class to the enclosing form-group div
    formGroup.classList.add('has-danger');

    // add help-block
    const message = document.createElement('div');
    message.className = 'form-control-feedback mb-2 mr-sm-2 mb-sm-0';
    message.textContent = result.message;
    message.id = `validation-message-${result.id}`;

    element.classList.add('form-control-danger');

    formGroup.appendChild(message);
  }

  remove(element, result) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // remove help-block
    const message = formGroup.querySelector(`#validation-message-${result.id}`);
    if (message) {
      formGroup.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
        formGroup.classList.remove('has-danger');
        formGroup.classList.add('has-success');
        element.classList.add('form-control-success');

      }
    }
  }
}
