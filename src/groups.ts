enum Position {
	upper = "upper",
	lower = "lower",
}

interface Context {
	position: Position,
}

export interface Group {
	mostly_congruent: Context,
	mostly_incongruent: Context,
}

export const groups: Group[] = [
	{
		mostly_congruent: {
			position: Position.upper,
		},
		mostly_incongruent: {
			position: Position.lower,
		}
	},
	{
		mostly_congruent: {
			position: Position.lower,
		},
		mostly_incongruent: {
			position: Position.upper,
		}
	}
];