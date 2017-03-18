import {app} from './app.module';
import {MidiService} from './midi.service';

class MainController {
  inputs: any[] = [];
  selectedInput: any = {name: 'MIDI Input is not available'};
  inputDisabled: boolean = true;

  outputs: any[] = [];
  selectedOutput: any = {name: 'MIDI Output is not available'};
  outputDisabled: boolean = true;

  connected: boolean;

  /* @ngInject */
  constructor(private $log: angular.ILogService, private midiService: MidiService) {
    midiService.connect().then(() => {
      console.log('Output[0]: %o', midiService.getOutputs()[0]);
      this.inputs = midiService.getInputs();
      if (this.inputs.length > 0) {
        this.inputSelection(this.inputs[this.inputs.length - 1].id);
      }
      this.outputs = midiService.getOutputs();
      if (this.outputs.length > 0) {
        this.outputSelection(this.outputs[this.outputs.length - 1].id);
      }
      console.log(this.inputs);

      this.connected = false;
    });
  }

  inputSelection(inputId: string) {
    this.$log.log('input selection: %o', inputId);
    var selectedInputArray = this.inputs.filter(input => input.id === inputId);
    if (selectedInputArray.length > 0) {
      this.selectedInput = selectedInputArray[0];
      this.inputDisabled = false;

      this.inputs.forEach(inp => this.midiService.deactivateInput(inp));
      this.midiService.activateInput(this.selectedInput);
    }
  }
  outputSelection(outputId: string) {
    this.$log.log('output selection: %o', outputId);
    var selectedOutputArray = this.outputs.filter(output => output.id === outputId);
    if (selectedOutputArray.length > 0) {
      this.selectedOutput = selectedOutputArray[0];
      this.outputDisabled = false;
      this.midiService.activateOutput(this.selectedOutput);
    }
  }
}

export const main: angular.IComponentOptions = {
  template: require('./main.html'),
  controller: MainController
};

app.component('main', main);


