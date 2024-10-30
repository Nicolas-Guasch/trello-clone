import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Signal, WritableSignal } from '@angular/core';

export interface menuOverlay {
  isOpen: WritableSignal<boolean>;
  overlayRef?: OverlayRef | null;
  button?: HTMLButtonElement;
  content?: CdkPortal;
}
