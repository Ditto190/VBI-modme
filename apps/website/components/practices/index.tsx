import { APP as MinimalistApp } from 'minimalist'
import { APP as ProfessionalApp } from 'professional'
import { APP as StandardApp } from 'standard'
import { APP as StreamlinedApp } from 'streamlined'
import { PracticePreview } from './PracticePreview'

export const StandardPractice = () => <PracticePreview App={StandardApp} />

export const MinimalistPractice = () => <PracticePreview App={MinimalistApp} />

export const StreamlinedPractice = () => <PracticePreview App={StreamlinedApp} />

export const ProfessionalPractice = () => <PracticePreview App={ProfessionalApp} />
